import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx"; import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModel from "./SubSectionModel";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = (sectionId) => { };

  return (
    <div className="space-y-4">
      <div>
        {course?.courseContent?.map((section) => (
          <details
            key={section._id}
            open
            className="rounded-md border border-richblack-700 bg-richblack-800"
          >
            {/* Section Header */}
            <summary className="flex items-center justify-between px-4 py-3 border-b border-richblack-600 cursor-pointer">

              <div className="flex items-center gap-3">
                <RxDropdownMenu className="text-richblack-200" />
                <p className="font-semibold text-richblack-5">
                  {section.sectionName}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button>
                  <MdEdit
                    className="text-richblack-200 hover:text-yellow-50"
                    onClick={() =>
                      handleChangeEditSectionName(
                        section._id,
                        section.sectionName
                      )
                    }
                  />
                </button>

                <button>
                  <RiDeleteBin6Line
                    className="text-richblack-200 hover:text-pink-200"
                    onClick={() => {
                      setConfirmationModal({
                        text1: "delete this section",
                        text2:
                          "all the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSection(section._id),
                        btn2Handler: () =>
                          setConfirmationModal(null),
                      });
                    }}
                  />
                </button>

                <span className="text-richblack-400">|</span>

                <BiDownArrow className="text-richblack-300" />
              </div>
            </summary>

            {/* Subsections */}
            <div className="px-5 py-3 space-y-2">
              {section?.subSection?.map((data) => (
                <div
                  key={data?._id}
                  className="flex items-center justify-between rounded-md border border-richblack-700 px-3 py-2 hover:bg-richblack-700"
                >
                  <div
                    onClick={() => setViewSubSection(data)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <RxDropdownMenu className="text-richblack-300" />
                    <p className="text-richblack-5 font-medium">
                      {data.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <button>
                      <MdEdit
                        className="text-richblack-300 hover:text-yellow-50"
                        onClick={() =>
                          setEditSubSection({
                            ...data,
                            sectionId: section._id,
                          })
                        }
                      />
                    </button>

                    <button>
                      <RiDeleteBin6Line
                        className="text-richblack-300 hover:text-pink-200"
                        onClick={() => {
                          setConfirmationModal({
                            text1: "delete this lecture",
                            text2: "this lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleDeleteSection(section._id),
                            btn2Handler: () =>
                              setConfirmationModal(null),
                          });
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Lecture */}
              <button
                onClick={() =>
                  setAddSubSection({
                    sectionId: section._id,
                  })
                }
                className="mt-3 flex items-center gap-2 text-yellow-50 font-semibold hover:underline"
              >
                <AiOutlinePlus />
                Add Lecture
              </button>
            </div>
          </details>
        ))}
      </div>

      {/* Modals */}
      {addSubSection ? (
        <SubSectionModel
          modelData={addSubSection}
          setModelData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModel
          modelData={viewSubSection}
          setModelData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModel
          modelData={editSubSection}
          setModelData={setEditSubSection}
          edit={true}
        />
      ) : null}
    </div>
  );
};

export default NestedView;