import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

class Layout extends React.Component{
    render(){
        return(
            <Router>
                <Header {...this.props}/>
                    <Switch>
                        <Route exact path="/">
                            <HomePage/>
                        </Route>
                        <Route path ='/Account/Profile'>
                            <Account {...this.props}/>
                        </Route>
                        <Route exact path="/SignUp">
                            <SignUp/>
                        </Route>
                        <Route exact path="/Login">
                            <Login/>
                        </Route>
                        <Route exact path ='/Account/Articles'>
                            <Articles {...this.props}/>
                        </Route>
                        <Route exact path ='/Account/EditAccount'>
                            <EditAccount/>
                        </Route>
                        <Route exact path='/Account/CreateArticle'>
                                <CreateArticle/>
                        </Route>
                        <Route exact path={'/Articles/:id'} component={ArticleID} />
                    </Switch>
            </Router>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        logout:() => dispatch(actions.authLOGOUT())
    }
}
export default withRouter(connect(null, mapDispatchToProps)(Layout));

