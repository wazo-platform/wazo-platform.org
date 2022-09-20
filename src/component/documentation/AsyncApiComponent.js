import React, { useEffect, useRef, useState } from 'react';
import "@asyncapi/react-component/styles/default.min.css";
import "./async-api.css";
import AsyncApiStandalone from '@asyncapi/react-component/browser/standalone';

const config = {
  schemaID: 'custom-spec',
  show: {
    errors: false,
  },
};

const AsyncApiComponent = ({ module }) => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [none, setNone] = useState(true);

  useEffect(() => {
    (async () => {
      setNone(false);
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8080/${module}`);
        if (response.status !== 200) {
          throw new Error(`There are no event listing available for service "${module}"`);
        }

        const schema = await response.text();

        await AsyncApiStandalone.render({
          schema,
          config,
        }, ref.current);
      } catch (e) {
        console.warn(e);
        setNone(true)
      }

      setLoading(false);
    })();
  }, [module]);

  return (
    <>
      {(loading || none) && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
          {loading && (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {none && <h5>No event listing is provided for service "{module}"</h5>}
        </div>
      )}
      <div ref={ref} />
    </>
  );
}

export default AsyncApiComponent;
