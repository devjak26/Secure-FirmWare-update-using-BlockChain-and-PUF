import React, { useState, useCallback }  from 'react';
import { Link, Navigate } from 'react-router-dom';
import { loadFull } from "tsparticles";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

import Particles from 'react-tsparticles';

function LoginForm() {

    const particlesInit = useCallback(async engine => {
		console.log(engine);
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async container => {
		await console.log(container);
	}, []);

  const [fields, setFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fields.email) {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(fields.email)) {
      setErrors({ ...errors, email: 'Email is invalid' });
      return;
    }
    if (!fields.password) {
      setErrors({ ...errors, password: 'Password is required' });
      return;
    }
    if (fields.email === 'correct-email@example.com' && fields.password === 'correct-password') {
      setIsLoggedIn(true);
    } else {
      setErrors({ ...errors, login: 'Invalid login' });
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/FileUpload' />;
  }

  return (
    <div className="login-page">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
              background: {
                  // color: {
                  //     value: "#0d47a1",
                  // },
              },
              fpsLimit: 120,
              interactivity: {
                  events: {
                      onClick: {
                          enable: true,
                          mode: "push",
                      },
                      onHover: {
                          enable: true,
                          mode: "repulse",
                      },
                      resize: true,
                  },
                  modes: {
                      push: {
                          quantity: 4,
                      },
                      repulse: {
                          distance: 200,
                          duration: 0.4,
                      },
                  },
              },
              particles: {
                  color: {
                      value: "#ffffff",
                  },
                  links: {
                      color: "#ffffff",
                      distance: 150,
                      enable: true,
                      opacity: 0.5,
                      width: 1,
                  },
                  collisions: {
                      enable: true,
                  },
                  move: {
                      direction: "none",
                      enable: true,
                      outModes: {
                          default: "bounce",
                      },
                      random: false,
                      speed: 2,
                      straight: false,
                  },
                  number: {
                      density: {
                          enable: true,
                          area: 800,
                      },
                      value: 80,
                  },
                  opacity: {
                      value: 0.5,
                  },
                  shape: {
                      type: "circle",
                  },
                  size: {
                      value: { min: 1, max: 5 },
                  },
              },
              detectRetina: true,
          }
        }
      />
    <MDBContainer fluid className="login"> {/* Add the MDBContainer component */}
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='email' name='email' type='email' size="lg" onChange={handleChange} value={fields.email} />
                {errors.email && <div className="text-danger">{errors.email}</div>}
                <MDBInput wrapperClass='mb-4 w-100' label='Password' id='password' name='password' type='password' size="lg" onChange={handleChange} value={fields.password} />
                {errors.password && <div className="text-danger">{errors.password}</div>}

                <MDBCheckbox name='remember' id='remember' className='mb-4' label='Remember password' />

                {errors.login && <div className="text-danger mb-4">{errors.login}</div>}
                <MDBBtn size='lg' type='submit'> {/* Change the button type to submit */}
                  Login
                </MDBBtn>
              </form>

              <hr className="my-4" />

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
}

export default LoginForm;
