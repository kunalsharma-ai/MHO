"use client";
import React from "react";
import { api, Page } from "@/util";
import { useMember } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import {
    Grid,
    Chip,
    Box,
    IconButton,
    Avatar,
    Collapse,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";

import { Datatable, Icon, SectionTitle } from "@/components";

import {
    Circle as CircleIcon,
    Close as CloseIcon
} from "@mui/icons-material";

import DataList from "@/componentsMHO/DataList";
import { SideDrawer } from "@/components/Popup";
import { useFRFSState, useToast } from "@/hooks";
import useSharedSocket from "@/hooks/useSharedSocket";

// todo: User List (Datatable with reload facility using reload-panelist event on document element) 
// todo: isActive (shows if user is online)
// todo: Basic User details 
// todo: User Profiles 
async function listUsers() {
    let resp = await api
        .post(`/api/v1/user`, {
            isActive: {
                $in: [true, false],
            },
        })
    if ("data" in resp) return resp.data;
    throw new Error("Unable to fetch User List");
}
export default function page() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [open, setOpen] = React.useState({ open: false, id: null });
    const activeUsers = useFRFSState({})
    const users = useFRFSState([])
    const me = useMember();
    const sharedSocket = useSharedSocket(me);

    React.useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return console.log("document defined nahi hai")
        document.addEventListener("reload-users", async e => {
            try {
                setIsLoading(true)
                const data = await listUsers();
                users.update(data);
                setIsLoading(false)
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        })
        setTimeout(() => {
            document.dispatchEvent(
                new Event("reload-users")
            );
        }, 100)
        return document.removeEventListener("reload-users", async e => {
            try {
                setIsLoading(true)
                const data = await listUsers();
                users.update(data);
                setIsLoading(false)
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        })
    }, [])
    React.useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;
        const { messages, emit } = sharedSocket;
        switch (messages.type) {
            case "online users":
                activeUsers.update(
                    messages.data.reduce((a, c) => {
                        let usr = c.split(":");
                        if (!(c[0] in a))
                            a[c[0]] = [];
                        a[c[0]].push(c[1]);
                        return a;
                    }, {})
                )
                document.dispatchEvent(
                    new Event("reload-users")
                );
                break;
            case "connected":
                emit("who", {});
                break;

            default:
                break;
        }
    }, [sharedSocket.messages])
    const columns = [
        {
            id: "role",
            label: "Role",
            render: (info) => info?.role?.Capitalize(),
        },
        {
            id: "name",
            label: "User",
            render: (info) => (
                <Page.Box display="flex" alignItems="center" gap={ 1 }>
                    <Avatar
                        sx={ { height: 25, width: 25 } }
                        src={ info.profilePicture }
                        alt="user photo"
                    />{ " " }
                    <Page.Text
                        sx={ {
                            fontSize: 13,
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        } }
                    >
                        { info.fullName }
                    </Page.Text>
                    { activeUsers.includes(info.mail) ? (
                        <CircleIcon sx={ { fontSize: 10, color: "#4dbf0b" } } />
                    ) : (
                        <CircleIcon sx={ { fontSize: 10, color: "red" } } />
                    ) }
                </Page.Box>
            ),
        },
        {
            id: "category",
            label: "Category",
            data: "category",
            feature: ["filterable"],
        },
        {
            id: "email",
            label: "Email",
            data: "mail",
            feature: ["searchable"],
            width: 280,
        },
        {
            id: "phone",
            label: "Phone Number",
            render: (info) => `+${info.phone}`,
            feature: ["searchable"],
            width: 150,
        }
    ];

    return (
        <Page.Box
            sx={ {
                bgcolor: (theme) => theme.palette.page.main,
                p: { xs: 2, md: 3 },
            } }
        >
            <Datatable
                columns={ columns }
                data={ users }
                isLoading={ isLoading }
                pagination={ [10, 20, 50, 100] }
                pageSize={ 20 }
                hideColumnSelector
                hideDownload
                noDataMsg="No Record Found."
                title={
                    <Page.Text
                        sx={ {
                            fontSize: "18px",
                            display: "inline-block",
                            fontWeight: "600",
                            borderBottom: (theme) =>
                                `2px solid ${theme.palette.primary.main}`,
                            pb: 0.5,
                            my: 1,
                        } }
                    >
                        Users List
                    </Page.Text>
                }
            />
            {/* <SideDrawer
        open={ open.open }
        hideTitleBar={ true }
        anchor="right"
        width={ "100vw" }
        onClose={ () => setOpen({ open: false, id: null }) }
      >
        <UserData
          userId={ open.id }
          onClose={ () => {
            setOpen({ open: false, id: null })
            setReload((reload + 1) % 10)
          } }
        />
      </SideDrawer> */}
        </Page.Box>
    );
}