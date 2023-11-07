import { Link } from "react-router-dom";
import NotFoundVector from "../assets/notfound.avif";
export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center px-4">
      <img className="h-96" src={NotFoundVector} alt="not found" />
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-3xl font-semibold text-blue-600">
          Page Not Found!
        </h1>
        <p className="max-w-sm font-light text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
          consectetur.
        </p>
        <Link
          to={"/"}
          className="w-fit mt-3 py-2 px-5 rounded-md border border-blue-600 text-blue-600"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
