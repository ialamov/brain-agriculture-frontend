import { STORAGE_KEY } from "../../../store/auth/thunks";
import { AppBar as AppBarContainer, Actions, Btn } from "./AppBar.styles"

const AppBar = () => {
  return (
    <AppBarContainer>
			<h1>Dashboard • Hub</h1>
			<Actions>
				<Btn 
					onClick={()=>{
					  localStorage.removeItem(STORAGE_KEY);
					  window.location.href = '/';
				}}>Logout</Btn>
			</Actions>
		</AppBarContainer>
  )
}

export default AppBar