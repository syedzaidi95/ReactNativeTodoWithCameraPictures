import React from 'react';
import { Text, View, TouchableOpacity, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraEx extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        photo: '',
        currentPrivewId: '',
        flashMode: Camera.Constants.FlashMode.off,
        zoom: 0,
        flashTxt: 'Off'
    };
    static getDerivedStateFromProps(nextProps) {
        return {
            currentPrivewId: nextProps.currentPrivewId
        }

    }
    zoomOut = () => this.setState({ zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1 });
    zoomIn = () => this.setState({ zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1 });

    zoomnflashButtons() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{textAlign: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange', width: 35, height: 35, borderRadius: 100, }} onPress={() => this.zoomOut()} >
                        <Text style={{
                            fontSize: 30,
                            textAlign: 'center',
                            color: 'black',
                            fontWeight: '500',
                            textShadowColor: 'white',
                            textShadowRadius: 20,
                        }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }} >Zoom Out</Text>
                </View>
                <View style={{textAlign: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: 35, height: 35, borderRadius: 100, }} onPress={() => { this.state.flashMode === Camera.Constants.FlashMode.on ? this.setState({ flashMode: Camera.Constants.FlashMode.off, flashTxt: 'Off' }) : this.setState({ flashMode: Camera.Constants.FlashMode.on, flashTxt: 'On' }) }}>
                    <Text style={{
                            fontSize: 15,
                            textAlign: 'center',
                            color: 'black',
                            fontWeight: '500',
                            textShadowColor: 'white',
                            textShadowRadius: 20,
                        }}>{this.state.flashTxt}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}>FLash</Text>
                </View>
                <View style={{textAlign: 'center', alignItems: 'center'}}>

                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange', width: 35, height: 35, borderRadius: 100, }} onPress={() => this.zoomIn()}>
                        <Text style={{
                            fontSize: 30,
                            textAlign: 'center',
                            color: 'black',
                            fontWeight: '500',
                            textShadowColor: 'white',
                            textShadowRadius: 20,
                        }}>+</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }} >Zoom In</Text>

                </View>
            </View>
        );
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    async capture() {
        const image = await this.camera.takePictureAsync();
        this.setState({ photo: image.uri })
    }
    addImagetoArray(e) {
        this.state.currentPrivewId === '' ? this.props.addfunc(e) : this.props.editfunc(e, this.state.currentPrivewId)
    }
    cancle() {
        this.setState({ photo: '' })
    }
    render() {
        console.log('Render ===> ', this.state.currentPrivewId)
        const { hasCameraPermission, photo } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                photo !== '' ?
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Image
                                source={{ uri: photo }}
                                style={{ flex: 1, borderWidth: 2 }}
                            />
                        </View>
                        <View style={{ flex: 0.25, flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'black' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { this.addImagetoArray(photo) }} style={{ alignItems: 'center' }}>
                                    <Image
                                        source={require('../../Images/edit.png')}
                                        style={{ width: 50, height: 50 }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ color: 'white' }} >Done</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { this.cancle() }} style={{ alignItems: 'center' }}>
                                    <Image
                                        source={require('../../Images/cancle.png')}
                                        style={{ width: 50, height: 50 }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ color: 'white' }} >Cancle</Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <Camera
                            style={{ flex: 1, justifyContent: 'flex-end' }}
                            type={this.state.type}
                            flashMode={this.state.flashMode}
                            autoFocus={Camera.Constants.AutoFocus.on}
                            zoom={this.state.zoom}
                            ref={ref => {
                                this.camera = ref
                            }}
                        >
                            <View style={{ flex: 0.1, flexDirection: 'column', }}>
                                {this.zoomnflashButtons()}
                            </View>
                        </Camera>
                        <View
                            style={{
                                flex: 0.25,
                                backgroundColor: 'black',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',

                            }}>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                        backgroundColor: 'orange',
                                        borderWidth: 2, borderRadius: 100, height: 50, width: 50
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            flashMode: Camera.Constants.FlashMode.off,
                                            zoom: 0,
                                            type:
                                                this.state.type === Camera.Constants.Type.back
                                                    ? Camera.Constants.Type.front
                                                    : Camera.Constants.Type.back,
                                        });
                                    }}>
                                    <Image
                                        source={require('../../Images/cameraFlip.png')}
                                        style={{ width: 40, height: 40, marginTop: 4 }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                

                            }}>
                                <TouchableOpacity onPress={() => this.capture()} style={{ backgroundColor: 'red', borderWidth: 2, borderColor: 'white', alignItems: 'center', borderRadius: 100, height: 75, width: 75 }} />
                            </View>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',

                            }}>
                                <TouchableOpacity onPress={() => this.props.backtoGallery()} style={{ alignItems: 'center', }} >
                                    <Image
                                        source={require('../../Images/gallery.png')}
                                        style={{ width: 50, height: 50 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            );
        }
    }
}