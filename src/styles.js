export const styles = (theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#282c34',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '12px',
      color: 'white'
    },
    container: {
      position: 'relative',
      marginBottom: 20,
      marginTop: 20
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
    form: {
      display: 'flex',
      alignItems: 'center'
    },
    textField: {
        width: 800,
        marginRight: 5,
        backgroundColor: '#FFFFFF',
        padding: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 3,
    },
    paper: {
        width: 800,
        position: 'absolute',
        zIndex: 100
    },
    typography: {
      color: '#FFFFFF',
      marginTop: 10,
      marginBottom: 0
    }
  });