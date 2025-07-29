import React from "react";
import { useIsFetching } from "react-query";
import { HeadProvider, Title } from "react-head";
import { QueryParamProvider } from "use-query-params";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { RepoDetail } from "./components/repo-detail";
import { OrgListing } from "./components/org-listing";
import { Home } from "./components/home";
import { useProgressBar } from "./hooks";
import { LocalFileProvider, useLocalFile } from "./components/local-file-context";
import { JSONDetail } from "./components/json-detail-container";

function LocalFileRoute() {
    const { filename, data } = useLocalFile();
    if (!data) {
        return <div className="p-8 text-center text-gray-500">No local file loaded. Please go back and drop a file.</div>;
    }
    return (
        <JSONDetail
            sha="local"
            filename={filename}
            owner="local"
            name="local"
            localData={data}
        />
    );
}

function App() {
  const isFetching = useIsFetching();
  useProgressBar(isFetching);

  return (
    <HeadProvider>
      <Title>Flat</Title>
          <LocalFileProvider>
              <Router>
                  <QueryParamProvider ReactRouterRoute={Route}>
                      <Switch>
                          <Route exact path="/" component={Home} />
                          <Route exact path="/:org/" component={OrgListing} />
                          <Route path="/local/:filename" component={LocalFileRoute} />
                          <Route path="/:owner/:name" component={RepoDetail} />
                      </Switch>
                  </QueryParamProvider>
              </Router>
          </LocalFileProvider>
    </HeadProvider>
  );
}

export default App;
