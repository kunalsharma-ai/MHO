// Server-side (prerender) registry: every page bundled up front so HTML renders synchronously.
import Home from '../pages/Home.jsx';
import HowItWorks from '../pages/HowItWorks.jsx';
import Rewards from '../pages/Rewards.jsx';
import Consumers from '../pages/Consumers.jsx';
import Professionals from '../pages/Professionals.jsx';
import WhoCanJoin from '../pages/WhoCanJoin.jsx';
import Quality from '../pages/Quality.jsx';
import About from '../pages/About.jsx';
import Faq from '../pages/Faq.jsx';
import Contact from '../pages/Contact.jsx';
import BlogList from '../pages/BlogList.jsx';
import BlogPost from '../pages/BlogPost.jsx';
import SignUp from '../pages/SignUp.jsx';
import Login from '../pages/Login.jsx';
import SetPassword from '../pages/SetPassword.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import LegalPage from '../pages/LegalPage.jsx';
import NotFound from '../pages/NotFound.jsx';

const MAP = { Home, HowItWorks, Rewards, Consumers, Professionals, WhoCanJoin, Quality, About, Faq, Contact, BlogList, BlogPost, SignUp, Login, SetPassword, ForgotPassword, LegalPage, NotFound };
export const eagerPages = { get: (n) => MAP[n], load: () => Promise.resolve() };
