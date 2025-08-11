import { AppBar as AppBarContainer, Actions, Btn } from "./AppBar.styles"

const AppBar = () => {
  return (
    <AppBarContainer>
			<h1>Dashboard • Hub</h1>
			<Actions>
				<Btn>Novo produtor</Btn>
				<Btn variant="secondary">Nova propriedade</Btn>
			</Actions>
		</AppBarContainer>
  )
}

export default AppBar