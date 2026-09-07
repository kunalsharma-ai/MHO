"use client";
import React from "react";
import { Grid, Tooltip, Dialog, Slider, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Cropper from "react-easy-crop";
import { Text } from "./";
import { api, Page } from "@/util";

function getCroppedImg(imageSrc, croppedAreaPixels, outputType = "image/jpeg") {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      canvas.toBlob(
        (blob) => resolve(blob),
        outputType,
        outputType === "image/jpeg" ? 0.92 : undefined,
      );
    };
  });
}

// ===== File icon mapping (Font Awesome classes) =====
const FILE_ICON_MAP = {
  pdf: "fa-file-pdf",
  doc: "fa-file-word",
  docx: "fa-file-word",
  xls: "fa-file-excel",
  xlsx: "fa-file-excel",
  jpg: "fa-file-image",
  jpeg: "fa-file-image",
  png: "fa-file-image",
};

function getFileIcon(fileName = "") {
  const extension = fileName.split(".").pop()?.toLowerCase();

  return FILE_ICON_MAP[extension] || "fa-file";
}

export default function Upload({
  onUpload,
  label = "",
  accept = "image/*",
  endpoint,
  name,
  editMode = false,
  setup = false,
  hideCaption = false,
  form,
  tooltipTitle = "Logo",
  multiple = false,
  ...attr
}) {
  const inputRef = React.useRef(null);
  const preview = form.watch(name); // could be string or array
  const [selectedFileNames, setSelectedFileNames] = React.useState([]);
  React.useEffect(() => {
    if (!preview) {
      setSelectedFileNames([]);
      return;
    }

    if (multiple && Array.isArray(preview)) {
      setSelectedFileNames(
        preview.map((file) => {
          const url = typeof file === "string" ? file : "";
          return url.split("/").pop() || "Uploaded file";
        }),
      );
    } else if (!multiple && typeof preview === "string") {
      setSelectedFileNames([preview.split("/").pop() || "Uploaded file"]);
    }
  }, [preview, multiple]);

  const outputType = accept.includes("image") ? "image/webp" : "";

  // ===== Crop states =====
  const [openCrop, setOpenCrop] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [tempImgURLs, setTempImgURLs] = React.useState([]);
  const [cropIndex, setCropIndex] = React.useState(0);

  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  // ============================
  // FILE SELECTION
  // ============================
  function onSelectFile(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setSelectedFileNames(files.map((file) => file.name));
    const urls = files.map((f) => URL.createObjectURL(f));

    if (outputType === "image/webp" && !multiple) {
      // open crop for each file
      setSelectedFiles(files);
      setTempImgURLs(urls);
      setCropIndex(0);
      setOpenCrop(true);
    } else {
      // upload directly
      if (multiple) uploadMultipleFiles(files);
      else uploadFile(files[0]);
    }

    e.target.value = "";
  }

  // ============================
  // SAVING CROPPED IMAGE
  // ============================
  async function handleCropSave() {
    const file = selectedFiles[cropIndex];
    const imgURL = tempImgURLs[cropIndex];

    if (!croppedAreaPixels || !file) return;

    const croppedBlob = await getCroppedImg(
      imgURL,
      croppedAreaPixels,
      outputType,
    );

    const ext = outputType.split("/")[1];
    const fileName = file.name.replace(/\.[^/.]+$/, `.${ext}`);

    const croppedFile = new File([croppedBlob], fileName, { type: outputType });
    await uploadFile(croppedFile);

    // Next file if multiple
    if (cropIndex < selectedFiles.length - 1) {
      setCropIndex(cropIndex + 1);
      setZoom(1);
      return;
    }

    // All done
    setOpenCrop(false);
  }

  // ============================
  // UPLOAD HELPERS
  // ============================
  async function uploadMultipleFiles(files) {
    for (const f of files) await uploadFile(f);
  }

  async function uploadFile(fileToUpload) {
    const formData = new FormData();
    formData.append("file", fileToUpload);

    const resp = await api.post(endpoint, formData);

    if (resp.status === "success") {
      if (multiple) {
        const oldVal = form.getValues(name) || [];
        form.setValue(name, [...oldVal, resp.file.url]);
      } else {
        form.setValue(name, resp.file.url);
      }
      if (onUpload) onUpload();
    }
  }

  // ============================
  // DELETE (for multiple)
  // ============================
  function removeImage(index) {
    const arr = form.getValues(name) || [];

    arr.splice(index, 1);

    form.setValue(name, [...arr]);

    setSelectedFileNames((prev) => prev.filter((_, i) => i !== index));
  }

  // ============================
  // UI
  // ============================
  return (
    <>
      {/* ------- CROP DIALOG ------- */}
      <Dialog
        open={openCrop}
        onClose={() => setOpenCrop(false)}
        fullWidth
        maxWidth="sm"
        sx={{ zIndex: 99999 }}
      >
        <div style={{ position: "relative", height: 400 }}>
          <Cropper
            image={tempImgURLs[cropIndex]}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(a, aPx) => setCroppedAreaPixels(aPx)}
          />
        </div>

        <div style={{ padding: 16 }}>
          {multiple && (
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              Image {cropIndex + 1} of {selectedFiles.length}
            </div>
          )}

          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, z) => setZoom(z)}
          />

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ color: "white", fontWeight: 600, mt: 1 }}
            onClick={handleCropSave}
          >
            Save Crop
          </Button>
        </div>
      </Dialog>

      {/* ------- IMAGE UPLOAD UI ------- */}
      {outputType === "image/webp" ? (
        <Grid container flexDirection="column" gap={0.5}>
          {editMode && (
            <Page.Text sx={{ px: 2, pt: 2, color: "grey" }}>{label}</Page.Text>
          )}

          {multiple ? (
            <Page.MuiButton
              component="label"
              variant="outlined"
              color="secondary"
              sx={{
                width: "120px",
                borderWidth: 2,
                fontWeight: 600,
                mb: 1,
              }}
            >
              Add Images
              <input
                id="file-upload"
                type="file"
                ref={inputRef}
                hidden
                accept={accept}
                onChange={onSelectFile}
                multiple={multiple}
              />
            </Page.MuiButton>
          ) : (
            <Grid
              component="label"
              htmlFor="file-upload"
              sx={{
                ml: editMode ? 3 : 0,
                my: 0.5,
                width: setup ? 100 : editMode ? 80 : 65,
                height: setup ? 100 : editMode ? 80 : 65,
                boxShadow: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                ...attr.sx,
              }}
            >
              <Grid
                container
                flexDirection="column"
                sx={{ width: "100%", height: "100%" }}
              >
                <Tooltip
                  title={`${!preview ? "Add" : "Edit"} ${tooltipTitle}`}
                  placement="top"
                >
                  <Page.Text
                    sx={{
                      py: 0.2,
                      fontSize: 13,
                      textAlign: "center",
                      bgcolor: "secondary.light",
                      color: "primary.main",
                      fontWeight: 600,
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                    }}
                  >
                    {!preview ? "Add" : "Edit"}
                  </Page.Text>
                </Tooltip>

                <img
                  src={preview || "/images/logo/user.png"}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.target.src = "/images/logo/user.png";
                  }}
                />
              </Grid>

              <input
                id="file-upload"
                type="file"
                ref={inputRef}
                hidden
                accept={accept}
                onChange={onSelectFile}
                multiple={multiple}
              />
            </Grid>
          )}

          {!hideCaption && (
            <Text sx={{ color: "grey", fontSize: 12, ml: editMode ? 2 : 0 }}>
              Max 100KB, JPEG/PNG/SVG only.
            </Text>
          )}

          {/* ------- MULTIPLE IMAGES GRID ------- */}
          {multiple && Array.isArray(preview) && preview.length > 0 && (
            <Grid container spacing={1} sx={{ mt: 1, px: editMode ? 3 : 0 }}>
              {preview.map((img, idx) => (
                <Grid
                  item
                  xs={4}
                  sm={3}
                  md={2}
                  key={idx}
                  sx={{ position: "relative" }}
                >
                  <img
                    src={img}
                    style={{
                      width: "100%",
                      height: 70,
                      objectFit: "cover",
                      borderRadius: 6,
                      boxShadow: "0 0 6px rgba(0,0,0,0.15)",
                    }}
                  />
                  <Button
                    size="small"
                    sx={{
                      minWidth: 0,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      position: "absolute",
                      top: -8,
                      right: -8,
                      bgcolor: "error.main",
                      color: "white",
                      "&:hover": { bgcolor: "error.dark" },
                      fontSize: 12,
                      p: 0,
                    }}
                    onClick={() => removeImage(idx)}
                  >
                    ✕
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      ) : (
        // ------- NON-IMAGE FILE UPLOAD -------
        <Page.Box mt={1}>
          <Page.MuiButton
            variant="contained"
            component="label"
            color="secondary"
            htmlFor="file-upload"
            endIcon={<UploadFileIcon />}
          >
            {multiple ? "Choose Files" : "Choose File"}
            <input
              id="file-upload"
              type="file"
              ref={inputRef}
              hidden
              accept={accept}
              onChange={onSelectFile}
              multiple={multiple}
            />
          </Page.MuiButton>

          {selectedFileNames.length > 0 && (
            <Page.Box
              sx={{
                mt: 1.5,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
                maxWidth: 550,
              }}
            >
              {selectedFileNames.map((fileName, index) => (
                <Page.Box
                  key={`${fileName}-${index}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 1.5,
                    py: 1.25,
                    border: "1px solid",
                    borderColor: "grey.200",
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "secondary.main",
                      bgcolor: "secondary.light",
                    },
                  }}
                >
                  <Page.Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 1.5,
                      bgcolor: "white",
                      border: "1px solid",
                      borderColor: "grey.200",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={`fas ${getFileIcon(fileName)}`}
                      style={{
                        fontSize: 21,
                        color: "#0A4DA5",
                      }}
                    />
                  </Page.Box>

                  <Page.Box sx={{ minWidth: 0, flex: 1 }}>
                    <Page.Text
                      sx={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "text.primary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={fileName}
                    >
                      {fileName}
                    </Page.Text>

                    <Page.Text
                      sx={{
                        fontSize: 11,
                        color: "text.secondary",
                        mt: 0.25,
                      }}
                    >
                      File uploaded successfully
                    </Page.Text>
                  </Page.Box>

                  {multiple && (
                    <Button
                      size="small"
                      onClick={() => removeImage(index)}
                      sx={{
                        minWidth: 30,
                        width: 30,
                        height: 30,
                        p: 0,
                        borderRadius: 1,
                        color: "text.secondary",
                        flexShrink: 0,
                        "&:hover": {
                          color: "error.main",
                          bgcolor: "error.light",
                        },
                      }}
                    >
                      <i
                        className="fas fa-trash-alt"
                        style={{ fontSize: 13 }}
                      />
                    </Button>
                  )}
                </Page.Box>
              ))}
            </Page.Box>
          )}

          {preview && (
            <Page.Text mt={1} fontSize={13} sx={{ color: "green" }}>
              Your Document is uploaded
            </Page.Text>
          )}
        </Page.Box>
      )}
    </>
  );
}
