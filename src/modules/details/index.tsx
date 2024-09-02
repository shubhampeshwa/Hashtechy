import { Image, Text, View } from "react-native"
import { styles } from "./style"


const Details = ({ route, navigation }: any) => {
    const charaterDetail = route.params
    const detailView = () => {
        return <View style={{width: "100%",padding: 10}}>
            <Text>Name: {charaterDetail.name.title + " " + charaterDetail.name.first + " " + charaterDetail.name.last  }</Text>
            <Text>Email: {charaterDetail.email }</Text>
            <Text>Phone Number: {charaterDetail.phone }</Text>
            <Text>Age: {charaterDetail.dob.age }</Text>
            <Text>Gender: {charaterDetail.gender }</Text>
            <Text>Location: {charaterDetail.location.city + "," + charaterDetail.location.state + "," + charaterDetail.location.country + "," + charaterDetail.location.postcode}</Text>
        </View>
    }
    
    return (<View style={styles.container}>
        <View style={styles.imgView}>
            <Image source={{ uri: charaterDetail?.picture.large }} style={styles.fullView} />
        </View>
        {detailView()}
    </View>)
}

export default Details