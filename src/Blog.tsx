import { Fragment, FunctionComponent, useEffect, useState } from "react";

import { Post } from './Post';
import { MakePost } from "./MakePost";

import { useLdo, useResource, useSolidAuth } from "@ldo/solid-react";
import { ContainerUri } from "@ldo/solid";

import { Container } from "@ldo/solid";

export const Blog: FunctionComponent = () => {
    const {session} = useSolidAuth();

    const { getResource } = useLdo();
    const [mainContainerUri, setMainContainerUri] = useState<ContainerUri | undefined>();

    const mainContainer = useResource(mainContainerUri);

    useEffect(() => {
        if (session.webId) {
            const webIdResource = getResource(session.webId);

            webIdResource.getRootContainer().then((rootContainerResult) => {
                if (rootContainerResult.isError) return;

                const mainContainer = rootContainerResult.child("my-solid-app/");
                setMainContainerUri(mainContainer.uri)

                mainContainer.createIfAbsent();
            })
        }
    }, [getResource, session.webId]);

    if (!session.isLoggedIn) return <p>No blog available. Log in first.</p>
    return (
        <main>
      <MakePost mainContainer={mainContainer} />
      <hr />
      {mainContainer && mainContainer
        // Get all the children of the main container
        .children()
        // Filter out children that aren't containers themselves
        .filter((child): child is Container => child.type === "container")
        // Render a "Post" for each child
        .map((child) => (
          <Fragment key={child.uri}> 
            <Post key={child.uri} postUri={child.uri} />
            <hr />
          </Fragment>
        ))}
    </main>
    )
}