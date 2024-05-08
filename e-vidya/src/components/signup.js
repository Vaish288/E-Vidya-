import React, { useState, useEffect,useCallback} from "react";
import { Link, useHistory } from "react-router-dom";
import TailSpin from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../styles/Login.css";

export const Signup = ({address, contract}) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [succ, setSucc] = useState(false);
  const [fail, setFail] = useState(false);
  const [loginType, setLoginType] = useState(null);
  const [passerr, setPasserr] = useState(false);
  const [loading, setLoading] = useState(false);

  const success = useCallback(() => {
    history.push("/login");
  }, [history]);

  const failure = () => {
    setFail(true);
  };

  useEffect(() => {
    if (succ) {
      success();
    } else if (fail) {
      failure();
    }
  }, [succ, fail, success]);

  const addUser = async () => {
    setLoading(true);
    const methodName = loginType === "student" ? "addStudent" : "addEducator";
    try {
      const response = await contract?.methods[methodName](name, pass).send({
        from: address,
      });
      console.log("Response: ", response);
      setSucc(true);
    } catch (error) {
      console.error("Error: ", error);
      setFail(true);
    } finally {
      setLoading(false);
    }
  };

  const passError = () => {
    return (
      <div className="alert alert-danger" role="alert">
        <p>Password should contain more than 8 characters</p>
      </div>
    );
  };

  const post = () => {
    if (pass.length < 8) {
      setPasserr(true);
    } else {
      addUser();
    }
  };

  return (
    <div className="outer-container justify-content-center">
      <div className="text-center py-2">
        {succ && <p>Registration successful. Redirecting to login...</p>}
        {fail && <p>Registration failed. Please try again.</p>}
      </div>
      <div className="text-center py-2">
        <h4>Signup</h4>
      </div>
      <div className="col-md-4 offset-md-4 py-2">
        <form>
          <div className="form-field">
            <span>
              <i className="fas fa-user-circle fa-2x"></i>
            </span>
            <input
              className="form-control my-2"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={e => setName(e.target.value)}
            ></input>
          </div>
          <div className="form-field">
            <span>
              <i className="fas fa-key fa-2x"></i>
            </span>
            <input
              className="form-control my-2"
              type="password"
              id="pass"
              name="pass"
              placeholder="Password"
              onChange={e => setPass(e.target.value)}
            ></input>
          </div>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitchesChecked"
              defaultChecked
              onChange={e => {
                setLoginType(e.target.checked ? "student" : null);
              }}
            />
            <label className="custom-control-label" htmlFor="studentCheckbox">
              Student Login
            </label>
          </div>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="educatorCheckbox"
              onChange={e => {
                setLoginType(e.target.checked ? "educator" : null);
              }}
            />
            <label className="custom-control-label" htmlFor="educatorCheckbox">
              Educator Login
            </label>
          </div>
          {passerr ? passError() : null}
        </form>
      </div>

      <div className="col-md-4 offset-md-4 text-center py-2">
        <button type="submit" className="btn btn-success" onClick={post}>
          {loading ? (
            <TailSpin type="TailSpin" height="30" width="30" color="#fff" />
          ) : (
            "Register"
          )}
        </button>
        <div className="access-info">
          <span>
            <i className="fas fa-hand-point-right fa-2x"></i>
          </span>
          <p>
            <em>Already have an account?&nbsp;</em>
            <Link to={"/login"}> Login!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
