import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import CameraEx from './components/Camera'

export default class Mainfile extends Component {
    constructor() {
        super();
        this.state = {
            images: [],
            Camera: false,
            currentPrivewId: '',
            preview: false,
        }
        this.addImage = this.addImage.bind(this)
        this.editImageInArray = this.editImageInArray.bind(this)
        this.backtoGallery = this.backtoGallery.bind(this)
    }
    addImage(photo) {
        let { images } = this.state
        images.push(photo)
        this.setState({ Camera: false, images: images })
    }
    editImageInArray(image, id) {
        const { images } = this.state;
        images[id] = image;
        this.setState({ Camera: false, preview: false, currentPrivewId: '', images: images })
    }
    deletImage() {
        const { images, currentPrivewId } = this.state;
        images.splice(currentPrivewId, 1);
        this.setState({ preview: false, images: images, currentPrivewId: '' })
    }
    backtoGallery() {
        this.setState({ Camera: false })
    }
    render() {
        return (
            this.state.preview ?
                <View style={styles.container}>
                    <Image
                        source={{ uri: this.state.images[this.state.currentPrivewId] }}
                        style={{ flex: 1 }}
                    />
                    <View style={{ flex: 0.25, flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'black' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.setState({ currentPrivewId: '', preview: false }) }}>
                                <Image
                                    source={require('../Images/cancle.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: 'white' }}>Cancle</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.setState({ preview: false, Camera: true }) }} >
                                <Image
                                    source={require('../Images/edit.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: 'white' }}>Edit</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.deletImage() }} >
                                <Image
                                    source={require('../Images/dellet.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: 'white' }}>Delet</Text>
                        </View>
                    </View>
                </View>
                :
                <View style={styles.container}>
                    {this.state.Camera === false ?
                        <View style={styles.gallery}>
                            {this.state.images.length === 0 ? <Text>No Images Here</Text> :
                                <View style={{ alignItems: 'center', flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flex: 0.1 }}>
                                        <Text style={{ textAlign: 'center' }}>Click on Image to opent it & edit or delet it</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                        {this.state.images.map((e, i) => {
                                            return (
                                                <TouchableOpacity onPress={() => { this.setState({ currentPrivewId: i, preview: true }) }} key={i} style={{ overflow: 'hidden', backgroundColor: 'black', width: 100, height: 100, borderWidth: 2, margin: 2, borderRadius: 10 }}>
                                                    <Image
                                                        key={i}
                                                        source={{ uri: e }}
                                                        style={{ width: 100, height: 100 }}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </View>
                            }
                            <TouchableOpacity onPress={() => { this.setState({ Camera: true }) }} style={styles.customBtn}>
                                <Text style={styles.fltBtnTxt}>+</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <CameraEx backtoGallery={this.backtoGallery} addfunc={this.addImage} editfunc={this.editImageInArray} currentPrivewId={this.state.currentPrivewId} />
                        </View>
                    }
                </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gallery: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    fltBtnTxt: {
        fontSize: 50,
    textAlign: 'center',
    color: 'black',
    letterSpacing: 3,
    fontWeight: '500',
    textShadowColor: 'white',
    textShadowRadius: 25,
    },
    customBtn: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: 'grey',
        borderRadius: 30,
        elevation: 15
    }


})