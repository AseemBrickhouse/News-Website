import React from 'react';
import {
    BrowserRouter as Router,
    Switch, 
    Route,
} from "react-router-dom";
import HomePage from './HomePage';
import Header from '../Dashboard/Header';
import Account from '../Dashboard/AccountHome/Account';
import ArticleID from '../Dashboard/ArticleID';
import Articles from '../Dashboard/AccountHome/Articles';
import EditAccount from '../Dashboard/AccountHome/EditAccount';
import CreateArticle from '../Dashboard/AccountHome/CreateArticle';
import Login from '../Buttons/Login';
import SignUp from '../Buttons/SignUp';
import FindPeople from '../Dashboard/People/FindPeople';
import AccountID from '../Dashboard/People/Account';
import SavedArticles from '../Dashboard/AccountHome/SavedArticles';
import Followers from '../Dashboard/People/Followers';
import Following from '../Dashboard/People/Following';
import AuthError from '../../Errors/AuthError';
import ArticleError from '../../Errors/ArticleError';
import SavedArticleError from '../../Errors/SavedArticleError';

const Routes = (props) =>{
    return(
    <React.Fragment>
        <Router>
            <Header {...props}/>
            <Switch>
                <Route exact path="/"><HomePage {...props}/></Route>
                <Route exact path="/SignUp" component={SignUp}/>
                <Route exact path="/Login" component={Login}/>
                <Route exact path ='/Account/EditAccount'><EditAccount {...props}/></Route>
                <Route exact path ='/Account/SavedArticles'><SavedArticles/></Route>
                <Route exact path='/Account/CreateArticle' component={CreateArticle}/>
                <Route exact path={'/Articles/:id'} component={ArticleID}/>
                <Route exact path='/Account/FindPeople' component={FindPeople}/>
                <Route exact path={'/Account/People/:key'} component={AccountID}/>
                <Route exact path={'/Account/Followers'} component={Followers}/>
                <Route exact path="/Account/Following" component={Following}/>
                <Route exact path ='/Account/Articles'><Articles {...props}/></Route>
                <Route exact path = "/AuthError" component={AuthError}/>
                <Route exact path = "/ArticleError" component={ArticleError}/>
                <Route exact path = "/SavedArticleError" component={SavedArticleError}/>
                {/* <Route path ='/Account/Profile'><Account {...props}/></Route> */}
            </Switch>
        </Router>
    </React.Fragment>  
    )
}
// class Routes extends React.Component{
//     constructor(props){
//         super(props)
//     };
//     render(){
//         return(
//         <React.Fragment>
//             <Router>
//                 <Header {...this.props}/>
//                 <Switch>
//                     <Route exact path="/">
//                         <HomePage {...this.props}/>
//                     </Route>
//                     <Route exact path="/SignUp" component={SignUp}/>
//                     <Route exact path="/Login" component={Login}/>
//                     <Route exact path ='/Account/EditAccount'><EditAccount {...this.props}/></Route>
//                     <Route exact path ='/Account/SavedArticles'><SavedArticles/></Route>
//                     <Route exact path='/Account/CreateArticle' component={CreateArticle}/>
//                     <Route exact path={'/Articles/:id'} component={ArticleID}/>
//                     <Route exact path='/Account/FindPeople' component={FindPeople}/>
//                     <Route exact path={'/Account/People/:key'} component={AccountID}/>
//                     <Route exact path={'/Account/Followers'} component={Followers}/>
//                     <Route exact path="/Account/Following" component={Following}/>
//                     {/* <Route exact path="/Account/SavedArticles" component={SavedArticles}/> */}
//                     <Route exact path ='/Account/Articles'>
//                         <Articles {...this.props}/>
//                     </Route>
//                     <Route path ='/Account/Profile'>
//                         <Account {...this.props}/>
//                     </Route>
//                 </Switch>
//             </Router>
//         </React.Fragment>
//         )
//     }
// }

// const mapStateToProps = state => {
//     // console.log(state.auth)
//     return{
//         isAuthenticated: state.auth.token !== null 
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         articles: () => dispatch(articleActions.getARTICLES()),
//         AutoTrySignUp: () => dispatch(authActions.authCheckState())
//     }
// }

export default Routes;

