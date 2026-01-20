import DataFormModal from "./dataFormModal";
import Logout from "./logout";


export default function Header(){

    return (
        <div className="w-full flex flex-row justify-center items-center gap-8 lg:gap-10 p-5 border-b-2">
            <Logout />
            <DataFormModal />
        </div>
    );
}
