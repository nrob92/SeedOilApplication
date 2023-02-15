import React, { useContext, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import AppContext from "../Contexts/AppContext";

const HomePage = () => {
  const { userRegistered, sectionRef, setSectionRef } = useContext(AppContext);

  useEffect(() => {
    if (sectionRef === "about") {
      document
        .getElementById("about")
        .scrollIntoView({ behavior: "smooth", block: "start", passive: true });
      setSectionRef("");
    }
    if (sectionRef === "faq") {
      document
        .getElementById("faq")
        .scrollIntoView({ behavior: "smooth", block: "start", passive: true });
      setSectionRef("");
    }
  }, [sectionRef]);

  return (
    <div>
        <div className="home-form">
          {userRegistered ? <Login /> : <Register />}
      </div>
        <div className="section-container">
          <section>
            <div className="section-box">
              <div>
                <h1>
                  Find healthy options:
                  <br /> <br />
                  1. create account
                  <br /> <br />
                  2. search for restaurant
                  <br /> <br />
                  3. inquire about oil usage
                  <br />
                  <br /> 4. update with reply, enjoy dining!
                </h1>
              </div>
            </div>
          </section>

          <section id="about">
            <div className="section-box">
              <h1>About</h1>
              <p>
                Our app helps health-conscious individuals find restaurants that
                use healthy oils and fats in their cooking. Using Google Maps,
                users can search for restaurants that do not use seed oils,
                instead opting for healthier options such as olive oil, avocado
                oil, and coconut oil. Additionally, the app allows users to
                search for restaurants that use other types of healthy fats such
                as butter, ghee, or tallow. The app's goal is to make it easy
                for people to make informed choices about the food they eat when
                dining out.
              </p>
            </div>
          </section>
          <section id="faq">
            <div className="section-box">
              <h1>FAQ</h1>
              <p>
                <strong>Q: How to use our app?</strong>
                <br /> A: Discover healthy eating options at your favorite
                restaurants with our app. Easily search for restaurants and find
                out if they use seed oils in their cooking. Send an inquiry to
                the restaurant directly through our built-in auto-mailer
                feature. Keep track of the restaurant's response and update
                their information in our app with a screenshot of the reply.
                Make informed decisions about your meals and enjoy dining out
                without any guilt!
                <br /> <br />
                <strong>Q: What are seed oils?</strong>
                <br /> A: Seed oils are vegetable oils that are derived from
                seeds, such as soybean, corn, and canola oil.
                <br />
                <br />
                <strong> Q: Why are seed oils bad for you?</strong>
                <br /> A: Seed oils are high in omega-6 fatty acids, which can
                lead to inflammation in the body when consumed in excess. They
                are also often highly processed and refined, which can strip
                them of important nutrients and increase the likelihood of
                rancidity.
                <br />
                <br />
                <strong>
                  {" "}
                  Q: How can I consume seed oils in a healthier way?
                </strong>
                <br /> A: Consume seed oils in moderation and opt for
                cold-pressed, unrefined versions whenever possible.
                <br />
                <br />
                <strong> Q: How can I reduce my intake of seed oils?</strong>
                <br />
                A: Instead of cooking with seed oils, you can use healthier
                options such as olive oil, avocado oil, or coconut oil. You can
                also try using other types of fats like butter, ghee, or tallow.
              </p>
            </div>
          </section>
        </div>
    </div>
  );
};

export default HomePage;
