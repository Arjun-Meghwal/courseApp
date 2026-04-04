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
    <div>
      <div>
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex items-center justify-between gap-x-2">
              <div className="flex items-center gap-3">
                <RxDropdownMenu />
                <p>{section.sectionName}</p>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit />
                </button>

                <button
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
                >
                  <RiDeleteBin6Line />
                </button>

                <span>|</span>
                <BiDownArrow className="text-xl text-richblack-300" />
              </div>
            </summary>

            <div>
              {section?.subSection?.map((data) => (
                <div
                  key={data?._id}
                  className="flex items-center justify-between gap-2"
                >
                  <div
                    onClick={() => setViewSubSection(data)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <RxDropdownMenu />
                    <p>{data.title}</p>
                  </div>

                  <div className="flex items-center gap-x-3">
                    <button
                      onClick={() =>
                        setEditSubSection({
                          ...data,
                          sectionId: section._id,
                        })
                      }
                    >
                      <MdEdit />
                    </button>

                    <button
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
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  setAddSubSection({
                    sectionId: section._id,
                  })
                }
                className="mt-4 flex items-center gap-2"
              >
                <AiOutlinePlus />
                <p>Add lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

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