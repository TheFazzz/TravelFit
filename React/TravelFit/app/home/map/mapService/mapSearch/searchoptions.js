import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import SearchOption from "./searchoption";
import locationData from "../../location/locationData";

export default function SearchOptions({searchView, searchInput, handleSearchPress}) {
    const [filteredItems, setFilteredItems] = useState(locationData)

    useEffect(() => {
        const updatedFilteredItems = locationData.filter(item =>
            item.gymName.toLowerCase().includes(searchInput.toLowerCase())
        );
        
        // Update the filteredItems state with the filtered results
        setFilteredItems(updatedFilteredItems);
    }, [searchInput])

    return (
        <View style={[styles.container, searchView]}>
            {filteredItems.map((data, index) => (
                <SearchOption data={data} handleSearchPress={handleSearchPress}/>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingLeft: 10,
        backgroundColor: 'white',
        height: '100%',
        opacity: 0.7,
        display: 'flex',
        gap: 10,
    }
})