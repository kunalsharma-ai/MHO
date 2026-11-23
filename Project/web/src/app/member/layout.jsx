import Shell from "./mx/Shell";
import MemberFooter from "./components/MemberFooter";

// Member area frame (mx/): panel top bar and navigation around every member page, styled after the member's
// panel design (HCP, caregiver or patient).
function layout({ children }) {
  return (
    <div>
      <Shell>{children}</Shell>
      <MemberFooter />
    </div>
  );
}

export default layout;
