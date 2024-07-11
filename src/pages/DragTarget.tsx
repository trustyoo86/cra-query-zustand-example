import { RefObject } from "react";
import Moveable, { OnDrag, OnResize } from 'react-moveable';

type Props = {
  ref: RefObject<HTMLDivElement>;
};

function DragTarget({ ref }: Props) {
  const handleDrag = ({ left, top, transform }: OnDrag) => {
    console.log(left, top);
    // setPosition({ left, top, transform });
  };

  const handleResizing = ({ width, height, delta, clientX, clientY, direction, dist }: OnResize) => {
    console.log('direction', direction, clientX, clientY, width, height, dist);
    // delta[0] && setPosition({ width, top: clientX, left: clientY });
    // delta[1] && setPosition({ height, top: clientX, left: clientY });
  };

  return (
    <Moveable
      target={ref?.current}
      container={null}
      origin={true}
      edge
      resizable
      throttleDrag={0}
      draggable
      throttleResize={0}
      // scaleable
      onDrag={handleDrag}
      onResize={handleResizing}
    // onScale={handleScale}
    />
  );
}

export default DragTarget;
