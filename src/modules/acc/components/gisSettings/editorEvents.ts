export enum EditorEvents {
  ModelLoaded = '$onEditorModelLoaded',
  LayerAdded = '$onEditorLayerAdded',
  LayerRemoved = '$onEditorLayerRemoved',
  LayerChanged = '$onEditorLayerChanged'
}

export enum LayerEvents {
  LayerAdded = '$onLayerAdded',
  LayerRemoved = '$onLayerRemoved',
  LayerChanged = '$onLayerChanged'
}

export enum MapEvents {
  PointerAdded = '$onPointerAdded',
  PointerMoved = '$onPointerMoved',
  PointerRemoved = '$onPointerRemoved',
  PointerChanged = '$onPointerChanged',
  MapReady = '$onMapReady'
}
