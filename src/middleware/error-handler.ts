import config from "../config";

export default function errorHandler(
  error: any,
  req: any,
  res: any,
  next: any
) {
  const response =
    config.NODE_ENV === "production"
      ? { error: "Server error" }
      : (console.error(error), { error: error.message, details: error });

  res.status(500).json(response);
}
