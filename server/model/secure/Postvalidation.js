const Yup = require("yup");

export const postschema = Yup.object().shape({
    title: Yup.string()
        .required("عنوان پست  الزامی می باشد")
        .min(4, "عنوان پست  نباید کمتر از 4 کاراکتر باشد")
        .max(255, "عنوان پست  نباید بیشتر از 255 کاراکتر باشد"),
    price: Yup.string()
        .required(" قیمت الزامی میباشد. "),
    qty: Yup.string()
        .required(" تعداد کالا الزامی میباشد. "),
    category: Yup.string()
        .required("انتخاب دسته بندی الزامی می باشد"),
        details: Yup.string()
        .required("پست جدید باید دارای محتوا باشد"),
    status: Yup.mixed().oneOf(
        ["خصوصی", "عمومی"],
        "یکی از 2 وضعیت خصوصی یا عمومی را انتخاب کنید"
    )
    .required(" وضعیت را انتخاب کنید "),
});
