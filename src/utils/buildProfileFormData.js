export const buildProfileFormData = (
  entityType,
  formData,
  imageFile,
  defaultAvatar
) => {
  const fd = new FormData();

  if (imageFile) {
    fd.append("avatar", imageFile);
  } else {
    fd.append("avatar", formData.avatar || defaultAvatar);
  }

  fd.append("name", formData.name);
  fd.append("birthday", formData.birthday);
  fd.append("gender", formData.gender);
  fd.append("tags", JSON.stringify(formData.tags));

  if (entityType == "contact") {
    fd.append("contactType", "custom");
  }

  return fd;
};
