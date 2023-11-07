// eslint-disable-next-line react/prop-types
export default function Badge({ variant, children }) {
  const variants = {
    Pending: "bg-orange-200 text-orange-600",
    Progress: "bg-blue-200 text-blue-600",
    Completed: "bg-green-200 text-green-600",
  };
  return (
    <label
      className={`${variants[variant]} font-medium text-sm px-1 rounded-md`}
    >
      {children}
    </label>
  );
}
