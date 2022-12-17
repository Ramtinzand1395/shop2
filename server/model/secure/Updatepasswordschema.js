const Yup = require("yup");

export const Updatepasswordschema = Yup.object().shape({
    oldpassword: Yup.string()
    .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
    .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
    .required("کلمه عبور قدیمی الزامی می باشد")
    .notOneOf([Yup.ref("newpassword"), null], "کلمه های عبور جدید و قدیمی یکسان هستند"),
    newpassword: Yup.string()
    .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
    .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
    .required("کلمه عبور الزامی می باشد"),
    re_newpassword: Yup.string()
    .required("تکرار کلمه عبور الزامی می باشد")
    .oneOf([Yup.ref("newpassword"), null], "کلمه های عبور یکسان نیستند"),
});
