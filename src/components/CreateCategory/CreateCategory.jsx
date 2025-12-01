import React from "react";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Field, Form, Formik } from "formik";
import {
  createCategory,
  getAllCategories,
} from "../../store/Categories/CategoriesActions";
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "../../store/Categories/categoriesSlice";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategories);
  return (
    <Formik
      initialValues={{ name: "", subCategories: [] }}
      onSubmit={(values) => {
        const payload = {
          categoryName: values.name,
          subCategories: [],
        };
        dispatch(createCategory(payload));
        dispatch(getAllCategories());
      }}
    >
      {({ touched, errors, isValid, dirty, setFieldValue }) => {
        return (
          <Form id="form">
            <div className="flex flex-col justify-between h-full">
              <div>
                <Field
                  name="name"
                  placeholder="Enter category name.."
                  type="text"
                  title="Category Name"
                  component={Input}
                  emptyValue={setFieldValue}
                  errorMessage={touched.name && errors.name && errors.name}
                />
                {/* <div className="pb-6 border-dashed border-b-[1px] border-[#D8DCE2]">
                <Input title={"Category Name"} placeholder={"Enter..."} />
              </div> */}
                {/* <div className="mt-6">
                <p className="text-[#5F6166] text-[14px]">Sub-Category</p>
                <div className="mt-6">
                  <Input title={"Sub-Category 1"} placeholder={"Enter..."} />
                  <p className="mt-6 cursor-pointer text-[#2922b3] text-[14px]">
                    + Add another
                  </p>
                </div>
              </div> */}
              </div>
              <div>
                <Button
                  height={"h-[48px]"}
                  borderRadius={"rounded-[8px]"}
                  backgroundColor={"bg-[#2922b3]"}
                  label={"Create Category"}
                  width={"w-full"}
                  disabled={!(isValid && dirty) || category?.isCreating}
                  isloading={category?.isCreating}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateCategory;
