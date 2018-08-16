export enum EditorEvents {
  ModelLoaded = '$onEditorModelLoaded',
  LayerAdded = '$onEditorLayerAdded',
  LayerRemoved = '$onEditorLayerRemoved',
  LayerChanged = '$onEditorLayerChanged'
}

export enum LayerEvents {
  LayerAdded = '$onLayerAdded',
  LayerRemoved = '$onLayerRemoved',
  LayerChanged = '$onLayerChanged',
  LayerInit = '$onLayerInit'
}

export enum MapEvents {
  PointerAdded = '$onPointerAdded',
  PointerMoved = '$onPointerMoved',
  PointerRemoved = '$onPointerRemoved',
  PointerChanged = '$onPointerChanged',
  MapInit = '$onMapInit',
  NoLayer = '$onNoLayer'
}
