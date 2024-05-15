import { UserRound } from "lucide-react";

const Avatar = () => {
    return (
        <div className="avatar">
            {/* <div className="w-10 mask mask-squircle justify-center items-center">
        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div> */}
            <UserRound size={24} />
        </div>
    );
};

export default Avatar;