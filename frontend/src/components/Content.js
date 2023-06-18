import React from 'react';

import TeamMatches from './TeamMatches';
import Referee from './Referee';
import TournamentManager from './TournamentManager';
import TeamRegistration from './TeamRegistration';
import CoachRegistrationForm from './CoachRegistrationForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PaymentInfo from './PaymentInfo';
import PaymentGateway from './PaymentGateway';
import FilterTitle from './FilterTitle';
import Home from './Home';
import SSSFilter from './SSSFilter';
import MatchLocation from './MatchLocation'
import AdminLogin from './AdminLogin';
import MatchSchedule from './MatchSchedule';
import Sponsors from './Sponsors';
import FAQHeader from './FAQHeader';
import AboutUs from './AboutUs';

import RulesandRegulationsTM from './RulesandRegulationsTM';
import TeamsAsPerDivision from './TeamsAsPerDivision';
import AddScore from './AddScore';
// import PaymentDetails from './PaymentInfo/PaymentDetails';

function Content() {
    var content = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 'calc(100% - 2em)',
        height: 'calc(100% - 6em)',
        overflow: 'auto',
        padding: '5em 1em',
        display: 'flex',
        flexGrow: 1,
        background: '#EDEDED'
    }
    return (
        <div className='content' style={content}>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/teamregistration" exact component={CoachRegistrationForm} />
                    <Route path="/payment-gateway" component={PaymentGateway} />
                    <Route path="/teammatches" component={TeamMatches} />

                    <Route path="/rulesandregulations" component={RulesandRegulationsTM} />

                    <Route path="/schedule" component={FilterTitle} />
                    <Route path="/accepted-teams" component={TeamsAsPerDivision} />
                    <Route path="/match_schedule" component={MatchSchedule} />

                    <Route path="/maps" component={MatchLocation} />
                    <Route path="/sponsors" component={Sponsors} />
                    <Route path="/admin_login" component={AdminLogin} />
                    <Route path="/aboutus" component={AboutUs} />

                    <Route path="/add-score" component={AddScore} />

                    <Route path="/referee" component={Referee} />
                    <Route path="/tournament-manager" component={TournamentManager} />
                    {/* <Route path="/payment-info" component={PaymentInfo} /> */}
                    {/* <Route path="/team-registrationsss" component={TeamRegistration} /> */}
                </Switch>
            </Router>
        </div>
    )
}

export default Content;
