import Shell from "./studio/Shell";
import MemberFooter from "./components/MemberFooter";

// Member area frame: the studio header and sidebar (panel look, quality score, rewards, language, light/dark,
// colour pattern, account menu) around every member page.
function layout({ children }) {
  return (
    <div>
      <Shell>{children}</Shell>
      <MemberFooter />
    </div>
  );
}

export default layout;
