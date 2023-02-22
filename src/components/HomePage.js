import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography, styled } from "@mui/material";

export function HomePage() {
  const [logIn, setLogIn] = useState(false);
  const [avatar, setAvatar] = useState(process.env.REACT_APP_AVATAR);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    isAuthenticated ? setLogIn(true) : setLogIn(false);
  }, [isAuthenticated]);

  const FeatureImage = styled("img")({
    maxWidth: "60%",
    height: "auto",
    marginBottom: "30px",
  });

  return (
    <>
      <div className="main">
        <img
          alt="placeholder banner"
          src={process.env.PUBLIC_URL + "/banner-image.jpg"}
          style={{
            margin: "60px 0px 0px",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </div>

      <div className="about">
        Welcome to Work Pal, the platform where you can rate and review your
        co-workers, and learn about the experiences of others in the workplace.
        Our mission is to create a space where employees can provide honest and
        professional feedback about their colleagues and work environments, and
        where job seekers can make informed decisions about potential employers.
        Our app is easy to use and designed to provide a safe and respectful
        environment for all users. Once you create a profile, you can rate your
        co-workers on various attributes such as work ethics, communication
        skills, and job performance. You can also write reviews that provide
        more in-depth insights into your experiences working with your
        co-workers. By joining Work Pal, you will have access to the experiences
        of thousands of employees and job seekers, giving you the opportunity to
        make informed decisions about your career prospects. Whether you are a
        job seeker looking for a new opportunity or an employee looking to
        improve your work environment, Work Pal is the right choice for you. So
        why wait? Sign up for Work Pal today and start rating and reviewing your
        co-workers. Let's work together to create a better workplace for
        everyone!
        <Grid container spacing={8} sx={{ mt: "0px" }}>
          <Grid item xs={12} md={4}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FeatureImage
                src={process.env.PUBLIC_URL + "/profile.png"}
                alt="Feature 1"
              />
            </div>

            <Typography
              variant="h5"
              fontFamily="Roboto, sans-serif"
              marginBottom={"10px"}
            >
              Create Your Profile
            </Typography>
            <Typography variant="body1" fontFamily="Roboto, sans-serif">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
              diam felis. Sed ac nunc bibendum, aliquet velit id, tempor libero.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FeatureImage
                src={process.env.PUBLIC_URL + "/monitor.png"}
                alt="Feature 2"
              />
            </div>
            <Typography
              variant="h5"
              fontFamily="Roboto, sans-serif"
              marginBottom={"10px"}
            >
              Search for People
            </Typography>
            <Typography variant="body1" fontFamily="Roboto, sans-serif">
              Morbi ultrices sapien sit amet libero fermentum venenatis. Nunc
              pharetra, velit ac pretium consequat, ex tortor pretium sem, ac
              scelerisque ante ante ut odio.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FeatureImage
                src={process.env.PUBLIC_URL + "/people.png"}
                alt="Feature 3"
              />
            </div>
            <Typography
              variant="h5"
              fontFamily="Roboto, sans-serif"
              marginBottom={"10px"}
            >
              Get Feedback
            </Typography>
            <Typography variant="body1" fontFamily="Roboto, sans-serif">
              Maecenas vestibulum lorem eu nunc egestas, non tristique augue
              lobortis. Vestibulum eu enim vel nisl lacinia volutpat. Donec
              aliquam, nulla sit amet ultricies tristique, nunc turpis
              sollicitudin magna, vitae luctus lorem erat ac odio.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
