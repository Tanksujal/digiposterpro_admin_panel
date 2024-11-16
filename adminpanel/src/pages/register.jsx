const Register = () => {
  return (
    <div>
      <div className="main-wrapper">
        {/* ============================================================== */}
        {/* Preloader - style you can find in spinners.css */}
        {/* ============================================================== */}
        <div className="preloader">
          <div className="lds-ripple">
            <div className="lds-pos" />
            <div className="lds-pos" />
          </div>
        </div>
        {/* ============================================================== */}
        {/* Preloader - style you can find in spinners.css */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* Login box.scss */}
        {/* ============================================================== */}
        <div
          className="
    auth-wrapper
    d-flex
    no-block
    justify-content-center
    align-items-center
    bg-dark
  "
        >
          <div className="auth-box bg-dark border-top border-secondary">
            <div>
              <div className="text-center pt-3 pb-3">
                <span className="db">
                  <img src="../assets/images/logo.png" alt="logo" />
                </span>
              </div>
              {/* Form */}
              <form
                method="post"
                className="form-horizontal mt-3"
                action="/registerUser"
              >
                <div className="row pb-4">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-success text-white h-100"
                          id="basic-addon1"
                        >
                          <i className="mdi mdi-account fs-4" />
                        </span>
                      </div>
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                    {/* email */}
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-danger text-white h-100"
                          id="basic-addon1"
                        >
                          <i className="mdi mdi-email fs-4" />
                        </span>
                      </div>
                      <input
                        type="text"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Email Address"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-warning text-white h-100"
                          id="basic-addon2"
                        >
                          <i className="mdi mdi-lock fs-4" />
                        </span>
                      </div>
                      <input
                        type="text"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-info text-white h-100"
                          id="basic-addon2"
                        >
                          <i className="mdi mdi-lock fs-4" />
                        </span>
                      </div>
                      <input
                        type="text"
                        name="cpassword"
                        className="form-control form-control-lg"
                        placeholder=" Confirm Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row border-top border-secondary">
                  <div className="col-12">
                    <div className="form-group">
                      <div className="pt-3 d-grid">
                        <button
                          className="btn btn-block btn-lg btn-info"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* ============================================================== */}
        {/* Login box.scss */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* Page wrapper scss in scafholding.scss */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* Page wrapper scss in scafholding.scss */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* Right Sidebar */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* Right Sidebar */}
        {/* ============================================================== */}
      </div>
    </div>
  );
};

export default Register;
