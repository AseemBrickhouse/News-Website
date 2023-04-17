import React from 'react';
import {withRouter, Link } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import * as savedArticleActions from '../../store/actions/savedArticles';
import { connect } from 'react-redux';
import Logout from '@mui/icons-material/Logout';
import { 
  Typography, Popover, Box, 
  Button, MenuItem,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const MyAccount = (props) =>{

    const [ProfileOpen, setProfileOpen] = React.useState(null);
    const handleProfileClick = (event) => setProfileOpen(event.currentTarget);
    const handleProfileClose = () => setProfileOpen(null)

    const [ArticleOpen, setArticleOpen] = React.useState(null);
    const handleArticleClick = (event) => setArticleOpen(event.currentTarget);
    const handleArticleClose = () => setArticleOpen(null)

    const [PeopleOpen, setPeopleOpen] = React.useState(null);
    const handlePeopleClick = (event) => setPeopleOpen(event.currentTarget);
    const handlePeopleClose = () => setPeopleOpen(null)

    const StyledTypography = styled(Typography)({
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      textTransform: "none",
      textDecoration: "none",
      fontSize: "17px",
      fontWeight: "700",
      textAlign: "center",
    })
    console.log(props.account)
    return(
      <Box sx={{display: "flex", flexDirection: "row", textDecoration: "none", padding: "5px"}}>
        <div>
          <Button onClick={handleProfileClick} style={{marginRight: "1vw"}}>
            <StyledTypography>
              Profile
            </StyledTypography>
          </Button>
          <Popover
            open={Boolean(ProfileOpen)}
            anchorEl={ProfileOpen}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem>
              <Link to={{
                pathname: '/Account/People/' + props.account.key + '/',
                state: { 
                  key: props.account.key,
                  person: props.account,
                },          
              }} 
              style={{ textDecoration: 'none' }} underline="none">
                <Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>
                  View Profile
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Account/EditAccount" style={{ textDecoration: 'none' }} underline="none">
                <Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>
                  Edit Profile
                </Typography>
              </Link>
            </MenuItem>
          </Popover>
        </div>
        <div>
          <Button onClick={handleArticleClick} style={{marginRight: "1vw"}}>
            <StyledTypography>
              Articles
            </StyledTypography>
          </Button>
          <Popover
            open={Boolean(ArticleOpen)}
            anchorEl={ArticleOpen}
            onClose={handleArticleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem>
              <Link to="/Account/Articles" style={{ textDecoration: 'none' }} underline="none">
                <Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>
                  My Articles
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Account/CreateArticle" style={{ textDecoration: 'none' }} underline="none">
                <Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>
                  Create Article
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Account/SavedArticles" style={{ textDecoration: 'none' }} underline="none">
                <Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>
                  Saved Articles
                </Typography>
              </Link>
            </MenuItem>
          </Popover>
        </div>
        <div>
          <Button onClick={handlePeopleClick} style={{marginRight: "1vw"}}>
            <StyledTypography>
              Explore
            </StyledTypography>
          </Button>
          <Popover
            open={Boolean(PeopleOpen)}
            anchorEl={PeopleOpen}
            onClose={handlePeopleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem>
              <Link to="/Account/FindPeople" style={{ textDecoration: 'none' }} underline="none">
                <Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>
                  Find People
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Account/Followers" style={{ textDecoration: 'none' }} underline="none">
                <Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>
                  My Followers
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Account/Following" style={{ textDecoration: 'none' }} underline="none">
                <Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>
                  Following
                </Typography>
              </Link>
            </MenuItem>
          </Popover>
        </div>
        <div>
          <Button onClick={props.logout} style={{marginRight: "1vw"}}>
            <StyledTypography>
            <div 
              style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
              <Logout />
              <span>Logout</span>
            </div>  
            </StyledTypography>
          </Button>
        </div>
        <div>
          <Button style={{marginRight: "1vw"}}>
            <Link to ='/SavedArticleError'>
              Test eror
            </Link>
          </Button>
        </div>
      </Box>
    )
}
// const handleLog = (props) =>{
//   console.log(props);
//   props.getSavedLogout;
//   props.logout;
// }
const mapStateToProps = (state) => {
  return{
    account: state.auth.account
  }
}
const mapDispatchToProps = dispatch => {
    return {
      getSavedLogout: () => dispatch(savedArticlesActions.getSavedLogout()),
      logout : () => {
        dispatch(savedArticleActions.getSAVEDLOGOUT()),
        dispatch(actions.authLOGOUT())
      }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MyAccount));