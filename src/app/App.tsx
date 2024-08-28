import {StoreProvider} from "./providers/store";
import {UserList} from "@/modules/user";

function App() {

    return (
        <StoreProvider>
            <UserList/>
        </StoreProvider>
    )
}

export default App
