import React from "react";
import { Jumbotron, Button,Badge } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProfilePage = ({ user }) => {
  return user ? (
    <div>
      <Jumbotron className="profile bg-warning  mr-auto w-75  "  >
        <img
          src={user.imageUrl}
          alt="Profile pic"
          style={{ width: 150, height: 150, borderRadius: "50%" }}
        />
        <h1 className="display-3">{user.name}</h1>
        <p className="lead"> <b> Email: </b> {user.email}</p>
        <p className="lead"> <b> followers: </b> 0</p>
        <p className="lead"> <b> following: </b>0 </p>
        <hr className="my-2" />
        <p className="lead">
          <Link to="/Messages">
            <Button color="primary">View Messages
            <Badge className="ml-1  " variant="danger">New</Badge>
            </Button>
          </Link>
        </p>
      </Jumbotron>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

const mapStateToProps = storeState => {
  return {
    user: storeState.googleAuthState.user
  };
};

export default connect(mapStateToProps)(ProfilePage);
