import api from "./api";

export const likeMedia = async (_id: string) => {
  const response = await api.put(`/media/${_id}/like`);
  return response.data?.data;
};

export const getMedia = async () => {
  const response = await api.get("/media");
  return response;
};

export const deleteMedia = async (_id: string) => {
  const response = await api.delete(`/media/${_id}`);
  return response.data;
};

export const uploadMedia = async (
  filePath: File,
  title: string,
  description: string,
  type: string
) => {
  const formData = new FormData();
  formData.append("filePath", filePath);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("type", type);
  const response = await api.post("/media/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
