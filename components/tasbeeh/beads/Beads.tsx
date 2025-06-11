import {View} from "react-native";
import Bead from "@/components/tasbeeh/beads/Bead";

type BeadsProps = {
    amount: number
}

const Beads = ({amount}: BeadsProps) => {
    return (
        <View>
            {Array.from({length: amount}).map((_, index) => (
                <Bead key={index}/>
            ))}
        </View>
    )
}

export default Beads