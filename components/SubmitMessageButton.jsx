import { FaPaperPlane } from "react-icons/fa";

const SubmitMessageButton = ({ isLoading }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className=" bg-[#7265df] text-white border border-[#7265df] hover:bg-[#f2f2f2] hover:text-[#7265df] hover:border-[#9c9ddc]
px-4 py-2 rounded-lg flex items-center justify-center w-full transition disabled:opacity-50"
    >
      {isLoading ? (
        "Sending..."
      ) : (
        <>
          <FaPaperPlane className="mr-2" /> Send Message
        </>
      )}
    </button>
  );
};

export default SubmitMessageButton;
