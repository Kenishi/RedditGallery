import { Box, Grid, IconButton, Stack, TextField } from '@mui/material';
import { fabric } from 'fabric';
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from 'react';
import './App.css';
import { DupeChecker } from './components/DupeChecker';
import { ImageProvider } from './components/ImageProvider';
import MenuIcon from '@mui/icons-material/Menu';

function App() {

    const [ isMenuOpen, setMenuOpen ] = useState<boolean>(false);
    const [ inputField, setInputField ] = useState<string>("");
    const [ redditList, setRedditList ] = useState<string[]>([]);

    const nullChecker: DupeChecker = {
        isDuplicate(image) {
            return false;
        },
        addImage(image) {
            return;
        },
    }

    const provider = new ImageProvider(new URL(""), nullChecker)


    useEffect(() => {
        
        
    }, []);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputField(event.target.value);
    
    return (
        <div className="App">
            <Grid container sx={{ height: "100vh" }}>
                <Grid item lg={ isMenuOpen ? 1 : 0.25 } sx={{ borderRight: "solid black 1px" }}>
                    <Stack>
                        <Box sx={{ textAlign: "right" }}>
                            <IconButton onClick={toggleMenu}>
                                <MenuIcon/>
                            </IconButton>
                        </Box>                    
                        <Box visibility={ isMenuOpen ? "visible" : "hidden"}>
                            <Grid item lg={12}>
                                <TextField size="small" value={inputField} onChange={handleInputChange} onKeyUp={(event) => {
                                    if(event.key === "Enter") setRedditList([...redditList, inputField]);
                                }}/>
                            </Grid>
                            <Grid item lg={12} sx={{ pt: 2 }}>
                                {redditList.map((item: string) => {
                                    return (
                                        <Box key={item} sx={{ ":nth-of-type(odd)" : { backgroundColor: "#A4A4A4", color: "white" }}}>
                                            {item}
                                        </Box>
                                    );
                                })}
                            </Grid>
                            <Grid item lg={12}>

                            </Grid>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
