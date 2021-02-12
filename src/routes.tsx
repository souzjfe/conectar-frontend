import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import ProfileFeatures from './pages/ProfileFeatures'
import ExperienceAreas from './pages/ExperienceAreas'
import MasteryTools from './pages/MasteryTools'
import CreateProject from './pages/CreateProject'
import ApproveProject from './pages/ApproveProject'
import Projects from './pages/Projects'
import Profiles from './pages/Profiles'
import { GlobalStyle } from './assets/style/global'
import { AuthProvider } from './context/AuthContext'
import Explorer from './pages/Explorer'
import { LoggedUserProvider } from './context/LoggedUserContext'
const Routes: React.FC = () => {
  return (
    <AuthProvider>

      <LoggedUserProvider>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/signup/:step" component={SignUp} />
          <Route path="/profilefeatures" component={ProfileFeatures} />
          <Route path="/experienceareas" component={ExperienceAreas} />
          <Route path="/masterytools" component={MasteryTools} />
          <Route path="/createproject" component={CreateProject} />
          <Route path="/approveproject/:id" component={ApproveProject} />
          <Route path="/projects/:id" component={Projects} />
          <Route path="/profiles/:id" component={Profiles} />
          <Route path="/explorer" component={Explorer} />
          <GlobalStyle />
        </BrowserRouter>
      </LoggedUserProvider>

    </AuthProvider>
  )
}
export default Routes
