import MoveableHelper from "moveable-helper";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
// import Moveable, { OnDrag, OnResize } from 'react-moveable';
import {
  makeMoveable,
  DraggableProps,
  ScalableProps,
  RotatableProps,
  ResizableProps,
  Rotatable,
  Draggable,
  Scalable,
  Resizable,
  OnResizeEnd,
} from "react-moveable";

const Moveable = makeMoveable<DraggableProps & ScalableProps & RotatableProps & ResizableProps>([
  Draggable,
  Scalable,
  Rotatable,
  Resizable,
]);

// type Props = {
//   ref: RefObject<HTMLDivElement>;
// };

// type Position = {
//   left: number;
//   top: number;
//   width: number;
//   height: number;
//   transform?: string;
//   dist: number[];
// };

type TargetProps = {
  id: number;
};

/* eslint-disable */
// const throttle = (func: (param: OnResize) => void, limit: number) => {
//   let inThrottle: boolean = false;
//   return function () {
//     const args = arguments;
//     // @ts-ignore
//     const context = this;
//     if (!inThrottle) {
//       // @ts-ignore
//       func.apply(context, args);
//       inThrottle = true;
//       setTimeout(() => inThrottle = false, limit);
//     }
//   }
// }
/* eslint-enable */

function DragTarget({ id }: TargetProps) {
  const [helper] = useState(() => new MoveableHelper());
  const targetRef = useRef<HTMLDivElement>(null);
  // const [isMounted, setMounted] = useState<boolean>(false);
  const [target, setTarget] = useState<EventTarget | null>(null);
  // const [elOptions, setElOptions] = useReducer(
  //   (prev: Position, next: Partial<Position>) => ({
  //     ...prev,
  //     ...next,
  //   }),
  //   {
  //     left: 0,
  //     top: 0,
  //     width: 200,
  //     height: 50,
  //     dist: [0, 0],
  //   }
  // );

  const handleMouseDown: MouseEventHandler = (e) => {
    const nativeEvent = e.nativeEvent;

    setTarget(() => nativeEvent.target);
  };

  // const handleDrag = ({ transform }: OnDrag) => {
  //   // setElOptions({ left, top, transform });
  //   setElOptions({ transform });
  // };

  // const handleResizing = ({ width, height, transform, dist }: OnResize) => {
  //   console.log('transform =>', transform);
  //   // const matrix = (transform.match(/matrix\((.*)\)/) as unknown as string)[1].split(',').map(Number);
  //   const dist1 = elOptions.dist[0] + dist[0];
  //   const dist2 = elOptions.dist[1] + dist[1];
  //   // const translateX = matrix[4] + dist[0];
  //   // const translateY = matrix[5] + dist[1];

  //   setElOptions({ width, height, transform: transform, dist: [dist1, dist2] });
  // };

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

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
          // width: elOptions.width,
          // height: elOptions.height,
          // left: elOptions.left,
          // top: elOptions.top,
          // transform: elOptions.transform,
          width: 200,
          height: 50,
          border: '1px solid #bdbdbd',
        }}
      >Moveable {id}
      </div>
      <Moveable
        target={target as HTMLElement}
        // container={null}
        // origin={true}
        edge
        resizable
        rotatable
        // throttleDrag={0}
        draggable
        // throttleResize={10}
        // snappable
        // scaleable
        onDragStart={helper.onDragStart}
        onDrag={helper.onDrag}
        onResizeStart={helper.onResizeStart}
        onResize={helper.onResize}
        onResizeEnd={handleResizeEnd}
        onRotateStart={helper.onRotateStart}
        onRotate={helper.onRotate}
      // onResize={helper.onResize}
      // onScale={handleScale}
      />
    </>
  );
}

export default DragTarget;
