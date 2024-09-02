import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { Colors, Screens } from "../../constant"
import { useEffect, useState } from "react"
import { getCharater } from "../../provider/api-services"
import { useDispatch, useSelector } from "react-redux"
import { updateCharaterList } from "../../redux/general.slice"
import { showToast } from "../../utilities"
import { Loader } from "../../components"
import { Int32 } from "react-native/Libraries/Types/CodegenTypes"

const Home = ({ navigation }: any) => {
    const disptach = useDispatch()
    const charaterList = useSelector((state: any) => state.general.charaterList)
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const [page, setPage] = useState<Int32>(1)

    useEffect(() => {
        getCharaterList()
    }, [])

    const getCharaterList = () => {
        const params = {page:1}
        getCharater(params).then((res: any) => {
            setIsRefreshing(false)
            if (!!res && !!res?.results) {
                if (page > 1) {
                    console.log('add on data')
                    const joinedArray = [...charaterList, ...res?.results];
                    disptach(updateCharaterList(joinedArray))
                } else {
                    console.log('reset data ')
                    disptach(updateCharaterList(res?.results))
                }
            } else {
                showToast("Something Went Wrong")
            }
        }).catch((e: any) => {
            console.log('error-', e)
            showToast(e?.message || "Something Went Wrong")
        })
    }
    
    const onCardPress = (id: string) => {
        let object = charaterList.filter(function(item:any){
            return  item.id.value == id
        })
        console.log(object[0])
        navigation.navigate(Screens.details,object[0])
    }
    const renderList = ({ item, index }: any) => {
        return (
            <>
            <TouchableOpacity activeOpacity={0.8} 
                style={{height:100,width: '90%',paddingHorizontal: 10,marginTop: 5,marginBottom:5,alignItems:'center',flexDirection: 'row'}}
                onPress={()=>{
                    onCardPress(item.id.value)
                }}
                >
                <Image source={{ uri: item.picture.medium }} style={{height: 80,width: 80,borderRadius: 40}} />
                <View style={{flex: 1,flexDirection:'column',paddingHorizontal: 10 }}>
                    <Text style={styles.name} numberOfLines={1}>{`${item.name.first} ${item.name.last}`}</Text> 
                    <Text style={styles.name} numberOfLines={1}>{`${item.email}`}</Text> 
                </View>
            </TouchableOpacity>
            <View style={{flex: 1,height: 1,backgroundColor:'gray'}} />
            </>)
    }

    return <View style={styles.container}>
        <FlatList
            data={charaterList}
            renderItem={renderList}
            keyExtractor={(item: any) => item?.id.value}
            style={{ flex: 1, }}
            contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 4 }}
            onRefresh={()=>{
                setPage(1)
                getCharaterList()
                setIsRefreshing(true)
            }}
            refreshing={isRefreshing}
            onEndReached={()=> {
                let pageCount = page + 1
                setPage(pageCount)
                getCharaterList()
                setIsRefreshing(true)
            }}
        />
        {charaterList.length == 0 && <Loader size={"large"} color={Colors.black} />}
    </View>
}

export default Home