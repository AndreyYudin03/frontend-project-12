import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login } from "../store/slices/authSlice.js";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(50, "Максимум 50 букв")
    .required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { error } = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    dispatch(login(values)).then(() => navigate("/"));
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log(values);
        handleSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <Field
              name="username"
              type="text"
              className={`form-control ${
                errors.username && touched.username ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              component="div"
              name="username"
              className="invalid-feedback"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className={`form-control ${
                errors.password && touched.password ? "is-invalid" : ""
              }`}
            />
            <ErrorMessage
              component="div"
              name="password"
              className="invalid-feedback"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
