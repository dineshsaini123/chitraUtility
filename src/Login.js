import { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [id, idchange] = useState("");
  const [password, pwchange] = useState("");
  const [response, setResponse] = useState(null);

  const navigate = useNavigate();

  const validate = true;

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    functionvalidate();

    if (validate) {
      // fetch(`https://localhost:7143/api/User/UserLogin?username=${id}&password=${password}`)
      // .then((res) => {
      //     if (!res.ok) {
      //         toast.error('Login Failed...');
      //         throw new Error('Network response was not ok');
      //     }
      //     return res.json(); // Parse JSON response
      // })
      // .then((res) => {

      //   console.log(res.result);

      //   if (res.result.length> 0) {

      //         //let userobj = res[0];
      //         //console.log(userobj);

      //         if (res.result.length> 0) {
      //             localStorage.setItem('username', id);
      //             localStorage.setItem('userrole', userobj.role);
      //             console.log('API Response:', res);
      //             //loginapi();
      //             navigate('/');
      //         } else {
      //             toast.error('User is inactive. Please contact admin for activation.');
      //         }
      //     } else {
      //         toast.error('Login failed. Invalid credentials.');
      //     }
      // })
      // .catch((error) => {
      //     console.error('Fetch Error:', error);
      //     toast.error('An error occurred during login.');
      // });
      fetch(
        `https://localhost:7143/api/User/UserLogin?username=${id}&password=${password}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Login Failed");
          }
          return res.json(); // Parse JSON response
        })
        .then((res) => {
          if (res.result === "pass") {
            // Check if the result is "pass"
            localStorage.setItem("username", id);
            localStorage.setItem("message", res.message); // Optional: Store the success message
            console.log("Login Successful:", res);
            loginapi();
            toast.success(res.message); // Display success message from the response
            navigate("/"); // Navigate to the home page
          } else {
            toast.error("Login failed. Invalid credentials or user inactive.");
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
          toast.error("An error occurred during login.");
        });
    } else {
      toast.warning("Please enter valid credenetials & proceed");
    }

   
    const loginapi = async () => {
      try {
        console.log(password + "" + id); // Debugging log to verify password and id values

        // Sending POST request
        const res = await fetch(
          "https://localhost:7143/api/Authorize/GenerateToken",
          
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: id,
              password: password,
            }),
          }
        );

        // Check if the response was successful
        if (res.ok) {
          const data = await res.json();
          console.log(data)
          if (data.token) {
            // Save token to localStorage
            localStorage.setItem("token", data.token);
          } else {
            console.error("Token not found in the response");
          }
        } else {
          console.error("Error: Failed to generate token. Status:", res.status);
        }
      } catch (error) {
        // Catch any errors in the try block
        console.error("Error in loginapi:", error);
      }
    };
  };

  const functionvalidate = () => {
    if (id.length === 0) {
      validate = false;
    }
    if (password.length === 0) {
      validate = false;
    }
  };

  return (
    <div>
      <form className="container" onSubmit={handlesubmit}>
        <div className="row">
          <div className="offset-lg-2 col-lg-8">
            <div className="card">
              <div className="card-header">
                <h2>User Login</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>
                    User Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={id}
                    onChange={(e) => idchange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>

                <div className="form-group">
                  <label>
                    Password<span className="text-danger">*</span>
                  </label>
                  <input
                    value={password}
                    type="password"
                    onChange={(e) => pwchange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-success" type="submit">
                  Login
                </button>
                <Link className="btn btn-primary" to="/register">
                  New User?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
