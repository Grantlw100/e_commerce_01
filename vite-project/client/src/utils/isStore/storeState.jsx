const StoreProvider = ({ children }) => {
    const [storeState, setStoreState] = useState(storeInitialState);
    const { user } = useContext(UserContext);
  
    useEffect(() => {
      // Load store data
      async function fetchStore() {
        const storeData = await fetchStoreFromDB();
        setStoreState(storeData);
      }
      fetchStore();
    }, []);
  
    return (
      <StoreContext.Provider value={{ storeState, setStoreState }}>
        {children}
      </StoreContext.Provider>
    );
  };
  