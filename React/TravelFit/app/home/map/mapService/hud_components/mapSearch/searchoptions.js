import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import SearchOption from "./searchoption.js";
import { useData } from "../../../../../../contexts/DatabaseContext.js";
import { context } from "../../../../../_layout.js";

export default function SearchOptions({searchInput, handleSearchPress, allLocations}) {
    const [filteredItems, setFilteredItems] = useState(allLocations) 
    const {searchFocus, setSearchFocus} = useContext(context)

    useEffect(() => {
        const updatedFilteredItems = allLocations.filter(item =>
            item.gym_name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredItems(updatedFilteredItems);
    }, [searchInput, allLocations])

    return (<>{searchFocus?  
        <View style={styles.container}>
        {filteredItems.map((data, index) => (
            <SearchOption data={data} handleSearchPress={handleSearchPress}/>
        ))}
        </View> 
    : <></>}</>)
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10,
        position: 'absolute',
        marginTop: 55,
        marginLeft: 20,
    }
})