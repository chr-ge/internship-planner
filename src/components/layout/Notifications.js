import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//material-ui
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
//icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
//redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
    state = {
        anchorEl: null
    }
    
    handleOpen = (event) => {
        this.setState({ anchorEl: event.target });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    onMenuOpened = () => {
        let unreadNotificationIds = this.props.notifications
            .filter((not) => !not.read)
            .map((not) => not.notificationId);
        
        this.props.markNotificationsRead(unreadNotificationIds);
    }

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;
        
        dayjs.extend(relativeTime);

        let notificationIcon;
        if(notifications && notifications.length > 0){
            notifications.filter((not) => not.read === false).length > 0
                ? notificationIcon = 
                    <Badge 
                        badgeContent={notifications.filter((not) => not.read === false).length}
                        color="secondary"
                    >
                        <NotificationsIcon />
                    </Badge>
                : notificationIcon = <NotificationsIcon />;
        } else {
            notificationIcon = <NotificationsIcon />;
        }

        let notificationsMarkup = notifications && notifications.length > 0
            ? notifications.map((not) => {
                const verb = not.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? 'primary' : 'secondary';
                const icon = not.type === 'like' 
                    ? <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} /> 
                    : <ChatIcon color={iconColor} style={{ marginRight: 10 }} />;
                return (<MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography 
                                component={Link}
                                color="default"
                                variant="body1"
                                to={`/users/${not.recipient}/i/${not.internshipId}`}
                            >
                                {not.sender} {verb} your internship {time}
                            </Typography>
                        </MenuItem>);
            })
            : <MenuItem onClick={this.handleClose}>You have no new notifications.</MenuItem>;

        return (
            <>
                <Tooltip placement="top" title="Notifications">
                    <IconButton 
                        aria-owns={anchorEl ? 'simple-menu' : undefined } 
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notificationIcon}
                    </IconButton>
                </Tooltip>
                <Menu 
                    anchorEl={anchorEl} 
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </>
        );
    }
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
    markNotificationsRead: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
});

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);
