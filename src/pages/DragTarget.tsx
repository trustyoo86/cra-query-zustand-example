import { Element } from "@/stores/element";
import MoveableHelper from "moveable-helper";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
// import Moveable, { OnDrag, OnResize } from 'react-moveable';
import Moveable, {
  OnResizeEnd,
} from "react-moveable";


type TargetProps = {
  id: number;
  elements: Element[]
};


function DragTarget({ id, elements }: TargetProps) {
  const [helper] = useState(() => new MoveableHelper());
  const targetRef = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<EventTarget | null>(null);

  const handleMouseDown: MouseEventHandler = (e) => {
    const nativeEvent = e.nativeEvent;

    setTarget(() => nativeEvent.target);
  };

  const handleResizeEnd = ({ target }: OnResizeEnd) => {
    console.log(target.style.width, target.style.height);
  };

  const handleClickOutSide = (ev: MouseEvent) => {
    if (!targetRef.current?.contains(ev.target as Node)) {
      setTarget(null);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  return (
    <>
      <div
        ref={targetRef}
        onMouseDown={handleMouseDown}
        id={`moveable-${id}`}
        key={`moveable-${id}`}
        className={`target moveable-${id}`}
        style={{
          position: 'absolute',
          width: 200,
          height: 50,
          border: '1px solid #bdbdbd',
        }}
      >Moveable {id}
      </div>
      <Moveable
        target={target as HTMLElement}
        edge
        resizable
        rotatable
        draggable
        onDragStart={helper.onDragStart}
        onDrag={helper.onDrag}
        onResizeStart={helper.onResizeStart}
        onResize={helper.onResize}
        onResizeEnd={handleResizeEnd}
        onRotateStart={helper.onRotateStart}
        onRotate={helper.onRotate}
        snappable
        elementGuidelines={elements.filter(el => el.id !== id).map(el => document.querySelectorAll(`.moveable-${el.id}`)[0])}
      />
    </>
  );
}

export default DragTarget;
