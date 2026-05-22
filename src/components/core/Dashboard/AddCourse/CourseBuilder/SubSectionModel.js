import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setCourse } from "../../../../../slices/courseSlice";
import {
	createSubSection,
	updateSubSection,
} from "../../../../../services/operations/courseDetailsApi";
import { RxCross2 } from "react-icons/rx";
import IconBtn from "../../../../common/IconBtn";
import Upload from "./Upload"

const SubSectionModel = ({
	modelData,
	setModelData,
	add = false,
	view = false,
	edit = false,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		getValues,
	} = useForm();

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const { course } = useSelector((state) => state.course);
	const { token } = useSelector((state) => state.auth);

	useEffect(() => {
		if (view || edit) {
			setValue("lectureTitle", modelData.title);
			setValue("lectureDesc", modelData.description);
			setValue("lectureVideo", modelData.videoUrl);
			// setValue("timeDuration", modelData.timeDuration);
		}
	}, [view, edit, modelData, setValue]);

	const isFormUpdated = () => {
		const currentValues = getValues();

		if (
			currentValues.lectureTitle !== modelData.title ||
			currentValues.lectureDesc !== modelData.description ||
			currentValues.lectureVideo !== modelData.videoUrl
			// currentValues.timeDuration !== modelData.timeDuration
		) {
			return true;
		}
		return false;
	};

	const handleEditSubSection = async () => {
		const currentValues = getValues();
		const formData = new FormData();

		formData.append("sectionId", modelData.sectionId);
		formData.append("subSectionId", modelData._id);

		if (currentValues.lectureTitle !== modelData.title) {
			formData.append("title", currentValues.lectureTitle);
		}

		if (currentValues.lectureDesc !== modelData.description) {
			formData.append("description", currentValues.lectureDesc);
		}

		if (currentValues.lectureVideo !== modelData.videoUrl) {
			formData.append("videoFile", currentValues.lectureVideo);
		}
		// if(currentValues.timeDuration !== modelData.timeDuration){
		//   formData.append("timeDuration", currentValues.timeDuration);
		// }
		setLoading(true);
		const result = await updateSubSection(formData, token);

		console.log("SUBSECTION RESULT", result);

		if (result?.courseName) {
			dispatch(setCourse(result));
		}

		setModelData(null);
		setLoading(false);
	};

	const onSubmit = async (data) => {
		if (view) return;

		if (edit) {
			if (!isFormUpdated()) {
				toast.error("no changes made to the form");
				return;
			} else {
				await handleEditSubSection();
				return;
			}
		}

		const formData = new FormData();
		formData.append("sectionId", modelData.sectionId);
		formData.append("title", data.lectureTitle);
		formData.append("description", data.lectureDesc);
		formData.append("videoFile", data.lectureVideo);
		// formData.append("timeDuration",data.timeDuration);

		setLoading(true);

		const result = await createSubSection(formData, token);

		console.log("SUBSECTION RESULT", result);

		if (result?.courseName) {
			dispatch(setCourse(result));
		}

		setModelData(null);
		setLoading(false);
	};

	return (
		<div className="fixed inset-0 z-[1000] grid place-items-center bg-black/60 backdrop-blur-md px-4 animate-fadeIn">

			{/* Modal */}
			<div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-richblack-700 bg-richblack-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-scaleIn transition-all duration-300">

				{/* Header */}
				<div className="flex items-center justify-between border-b border-richblack-700 bg-richblack-900/60 px-8 py-5">

					<div>
						<h2 className="text-2xl font-bold text-richblack-5">
							{view && "View Lecture"}
							{add && "Add New Lecture"}
							{edit && "Edit Lecture"}
						</h2>

						<p className="mt-1 text-sm text-richblack-300">
							Upload lecture video and details
						</p>
					</div>

					<button
						onClick={() => {
							if (!loading) setModelData(null);
						}}
						className="rounded-full p-2 text-richblack-300 transition-all duration-200 hover:bg-richblack-700 hover:text-pink-200"
					>
						<RxCross2 className="text-2xl" />
					</button>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6 px-8 py-8"
				>

					{/* Upload */}
					<div className="rounded-2xl bg-black border border-richblack-700 bg-richblack-900/40 p-4 transition-all duration-300 hover:border-yellow-500/30">

						<Upload
							name="lectureVideo"
							label="Lecture Video"
							register={register}
							errors={errors}
							setValue={setValue}
							video={true}
							viewData={view ? modelData.videoUrl : null}
							editData={edit ? modelData.videoUrl : null}
						/>
					</div>

					{/* Lecture Title */}
					<div className="flex flex-col gap-2">

						<label className="text-sm font-semibold text-richblack-100">
							Lecture Title
						</label>

						<input
							id="lectureTitle"
							placeholder="Enter lecture title..."
							{...register("lectureTitle", { required: true })}
							className="w-full bg-black rounded-2xl border border-richblack-600 bg-richblack-700 px-5 py-3 text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
						/>

						{errors.lectureTitle && (
							<span className="text-xs font-medium text-pink-200">
								Lecture title is required
							</span>
						)}
					</div>

					{/* Lecture Description */}
					<div className="flex flex-col gap-2 bg-black">

						<label className="text-sm font-semibold text-richblack-100">
							Lecture Description
						</label>

						<textarea
							id="lectureDesc"
							placeholder="Enter lecture description..."
							{...register("lectureDesc", { required: true })}
							className="min-h-[160px]  bg-black w-full resize-none rounded-2xl border border-richblack-600 bg-richblack-700 px-5 py-4 text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
						/>

						{errors.lectureDesc && (
							<span className="text-xs font-medium text-pink-200">
								Lecture description is required
							</span>
						)}
					</div>

					{/* Footer */}
					{!view && (
						<div className="flex justify-end gap-4 border-t border-richblack-700 pt-6">

							<button
								type="button"
								onClick={() => setModelData(null)}
								className="rounded-xl border border-richblack-600 px-5 py-2.5 font-medium text-richblack-200 transition-all duration-200 hover:bg-richblack-700"
							>
								Cancel
							</button>

							<button
								type="submit"
								disabled={loading}
								className="rounded-xl bg-yellow-400 px-6 py-2.5 font-semibold text-richblack-900 shadow-lg transition-all duration-200 hover:scale-[1.03] hover:bg-yellow-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{loading
									? "Processing..."
									: edit
										? "Save Changes"
										: "Save Lecture"}
							</button>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default SubSectionModel;